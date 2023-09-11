package ru.sonyabeldy.historicaldances.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.sonyabeldy.historicaldances.dto.DanceDTO;
import ru.sonyabeldy.historicaldances.dto.DanceListDTO;
import ru.sonyabeldy.historicaldances.dto.DanceTypeDTO;
import ru.sonyabeldy.historicaldances.models.Dance;
import ru.sonyabeldy.historicaldances.models.DanceList;
import ru.sonyabeldy.historicaldances.models.DanceType;
import ru.sonyabeldy.historicaldances.services.DanceListService;
import ru.sonyabeldy.historicaldances.services.DanceService;
import ru.sonyabeldy.historicaldances.services.DanceTypeService;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
public class AdminPageController {

    private final ModelMapper modelMapper;
    private final DanceListService danceListService;
    private final DanceService danceService;
    private final DanceTypeService danceTypeService;

    @Autowired
    public AdminPageController(ModelMapper modelMapper, DanceListService danceListService, DanceService danceService, DanceTypeService danceTypeService) {
        this.modelMapper = modelMapper;
        this.danceListService = danceListService;
        this.danceService = danceService;
        this.danceTypeService = danceTypeService;
    }

    @GetMapping()
    public String index(Model model) {
//        model.addAttribute(danceListService.find, "dances");
        model.addAttribute("danceLists", danceListService.findAll());
        return "admin/index2";
    }

    @ResponseBody
    @GetMapping("/dance-lists")
    public List<DanceListDTO> getAllDanceLists() {
        return danceListService.findAll().stream().map(this::convertToDanceListDTO).collect(Collectors.toList());
    }

    @ResponseBody
    @GetMapping("/dances")
    public List<DanceDTO>  getAllDances() {
        return danceService.findAll().stream().map(this::convertToDanceDTO).collect(Collectors.toList());
    }

    @ResponseBody
    @GetMapping("/dance-types")
    public List<DanceTypeDTO> getAllDanceTypes() {
        return danceTypeService.findAll().stream().map(this::convertToDanceTypeDTO).collect(Collectors.toList());
    }

    @ResponseBody
    @PostMapping("/new-dance-list")
    public ResponseEntity<HttpStatus> create(@RequestBody DanceListDTO dto) {
        danceListService.save(convertToDanceList(dto));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @ResponseBody
    @PostMapping("/new-dance")
    public ResponseEntity<HttpStatus> create(@RequestBody DanceDTO dto) {
        danceService.save(convertToDance(dto), danceTypeService.findDanceTypeByName(dto.getType().getName()).orElseThrow());
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @ResponseBody
    @PostMapping("/new-dance-type")
    public ResponseEntity<HttpStatus> create(@RequestBody DanceTypeDTO dto) {
        danceTypeService.save(convertToDanceType(dto));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    private DanceList convertToDanceList(DanceListDTO dto) {
        return modelMapper.map(dto, DanceList.class);
    }
    private DanceListDTO convertToDanceListDTO(DanceList danceList) {
        return modelMapper.map(danceList, DanceListDTO.class);
    }

    private Dance convertToDance(DanceDTO dto) {
        return modelMapper.map(dto, Dance.class);
    }

    private DanceDTO convertToDanceDTO(Dance dance) {
        return modelMapper.map(dance, DanceDTO.class);
    }

    private DanceType convertToDanceType(DanceTypeDTO dto) {
        return modelMapper.map(dto, DanceType.class);
    }

    private DanceTypeDTO convertToDanceTypeDTO(DanceType danceType) {
        return modelMapper.map(danceType, DanceTypeDTO.class);
    }


}

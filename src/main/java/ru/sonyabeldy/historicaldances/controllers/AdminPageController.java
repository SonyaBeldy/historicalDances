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
import ru.sonyabeldy.historicaldances.models.Dance;
import ru.sonyabeldy.historicaldances.models.DanceList;
import ru.sonyabeldy.historicaldances.services.DanceListService;
import ru.sonyabeldy.historicaldances.services.DanceService;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
public class AdminPageController {

    private final ModelMapper modelMapper;
    private final DanceListService danceListService;
    private final DanceService danceService;

    @Autowired
    public AdminPageController(ModelMapper modelMapper, DanceListService danceListService, DanceService danceService) {
        this.modelMapper = modelMapper;
        this.danceListService = danceListService;
        this.danceService = danceService;
    }

    @GetMapping()
    public String index(Model model) {
//        model.addAttribute(danceListService.find, "dances");
        model.addAttribute("danceLists", danceListService.findAll());
        return "admin/index";
    }

    @ResponseBody
    @GetMapping("/dance-lists")
    public List<DanceListDTO> getAllDanceLists() {
        return danceListService.findAll().stream().map(this::convertToDanceListDTO).collect(Collectors.toList());
    }

    @ResponseBody
    @PostMapping("/new-dance-list")
    public ResponseEntity<HttpStatus> create(@RequestBody DanceListDTO dto, BindingResult bindingResult) {
        danceListService.save(convertToDanceList(dto));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @ResponseBody
    @GetMapping("/dances")
    public List<DanceDTO>  getAllDances() {
        return danceService.findAll().stream().map(this::convertToDanceDTO).collect(Collectors.toList());
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



}

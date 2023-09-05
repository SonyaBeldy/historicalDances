package ru.sonyabeldy.historicaldances.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.sonyabeldy.historicaldances.dto.DanceListDTO;
import ru.sonyabeldy.historicaldances.models.DanceList;
import ru.sonyabeldy.historicaldances.services.DanceListService;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
public class AdminPageController {

    private final ModelMapper modelMapper;
    private final DanceListService danceListService;

    @Autowired
    public AdminPageController(ModelMapper modelMapper, DanceListService danceListService) {
        this.modelMapper = modelMapper;
        this.danceListService = danceListService;
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

    private DanceList convertToDanceList(DanceListDTO dto) {
        return modelMapper.map(dto, DanceList.class);
    }
    private DanceListDTO convertToDanceListDTO(DanceList danceList) {
        return modelMapper.map(danceList, DanceListDTO.class);
    }

    @ResponseBody
    @PostMapping("/new-dance-list")
    public ResponseEntity<HttpStatus> create(@RequestBody DanceListDTO dto, BindingResult bindingResult) {
        danceListService.save(convertToDanceList(dto));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }




}

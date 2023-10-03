package ru.sonyabeldy.historicaldances.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.sonyabeldy.historicaldances.dto.DanceDTO;
import ru.sonyabeldy.historicaldances.models.Dance;
import ru.sonyabeldy.historicaldances.services.DanceService;
import ru.sonyabeldy.historicaldances.services.DanceTypeService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dances")
public class DanceController {
    private final ModelMapper modelMapper;

    private final DanceService danceService;

    @Autowired
    public DanceController(ModelMapper modelMapper, DanceService danceService) {
        this.modelMapper = modelMapper;
        this.danceService = danceService;
    }

    @GetMapping
    public List<DanceDTO> getAll () {
        return danceService.findAll().stream().map(this::convertToDanceDTO).collect(Collectors.toList());
    }

    private Dance convertToDance(DanceDTO dto) {
        return modelMapper.map(dto, Dance.class);
    }
    private DanceDTO convertToDanceDTO(Dance dance) {
        return modelMapper.map(dance, DanceDTO.class);
    }

}

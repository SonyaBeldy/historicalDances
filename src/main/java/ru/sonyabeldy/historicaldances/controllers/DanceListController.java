package ru.sonyabeldy.historicaldances.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sonyabeldy.historicaldances.dto.DanceListDTO;
import ru.sonyabeldy.historicaldances.models.DanceList;
import ru.sonyabeldy.historicaldances.services.DanceListService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dance-lists")
public class DanceListController {

    private final ModelMapper modelMapper;
    private final DanceListService danceListService;

    public DanceListController(ModelMapper modelMapper, DanceListService danceListService) {
        this.modelMapper = modelMapper;
        this.danceListService = danceListService;
    }

    @PatchMapping("/update")
    public ResponseEntity<HttpStatus> update(@RequestBody DanceListDTO dto) {

        System.out.println("update server");
        danceListService.update(dto.getId(), convertToDanceList(dto));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping()
    public List<DanceListDTO> getAll() {
        System.out.println("danceListService.findAll() = " + danceListService.findAll());
        return danceListService.findAll().stream().map(this::convertToDanceListDTO).collect(Collectors.toList());
    }


    private DanceList convertToDanceList(DanceListDTO dto) {
        return modelMapper.map(dto, DanceList.class);
    }

    private DanceListDTO convertToDanceListDTO(DanceList danceList) {
        return modelMapper.map(danceList, DanceListDTO.class);
    }
}

package ru.sonyabeldy.historicaldances.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sonyabeldy.historicaldances.dto.DanceListDTO;
import ru.sonyabeldy.historicaldances.models.Dance;
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
        danceListService.update(convertToDanceList(dto));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/remove-dance")
    public ResponseEntity<HttpStatus> removeDance(@RequestBody DanceListDTO dto, Dance dance) {
        danceListService.deleteDance(convertToDanceList(dto), dance);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping()
    public List<DanceListDTO> getAll() {
        return danceListService.findAll().stream().map(this::convertToDanceListDTO).collect(Collectors.toList());
    }

    @PostMapping("/new")
    public ResponseEntity<HttpStatus> save(@RequestBody DanceListDTO dto) {
        danceListService.save(convertToDanceList(dto));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<HttpStatus> delete(@RequestBody DanceListDTO dto) {
        danceListService.delete(convertToDanceList(dto));
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    private DanceList convertToDanceList(DanceListDTO dto) {
        return modelMapper.map(dto, DanceList.class);
    }

    private DanceListDTO convertToDanceListDTO(DanceList danceList) {
        return modelMapper.map(danceList, DanceListDTO.class);
    }
}

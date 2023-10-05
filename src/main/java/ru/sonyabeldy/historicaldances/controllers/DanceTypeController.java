package ru.sonyabeldy.historicaldances.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.sonyabeldy.historicaldances.dto.DanceListDTO;
import ru.sonyabeldy.historicaldances.dto.DanceTypeDTO;
import ru.sonyabeldy.historicaldances.models.DanceList;
import ru.sonyabeldy.historicaldances.models.DanceType;
import ru.sonyabeldy.historicaldances.services.DanceTypeService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dance-types")
public class DanceTypeController {

    private final DanceTypeService danceTypeService;
    private final ModelMapper modelMapper;

    public DanceTypeController(DanceTypeService danceTypeService, ModelMapper modelMapper) {
        this.danceTypeService = danceTypeService;
        this.modelMapper = modelMapper;
    }

    @GetMapping()
    public List<DanceTypeDTO> getAll() {
        return danceTypeService.findAll().stream().map(this::convertToDanceTypeDTO).collect(Collectors.toList());
    }

    private DanceList convertToDanceType(DanceTypeDTO dto) {
        return modelMapper.map(dto, DanceList.class);
    }

    private DanceTypeDTO convertToDanceTypeDTO(DanceType danceType) {
        return modelMapper.map(danceType, DanceTypeDTO.class);
    }

}

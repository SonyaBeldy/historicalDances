package ru.sonyabeldy.historicaldances.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sonyabeldy.historicaldances.models.DanceType;
import ru.sonyabeldy.historicaldances.repositories.DanceTypeRepository;

import java.util.List;

@Service
public class DanceTypeService {

    private final DanceTypeRepository danceTypeRepository;

    @Autowired
    public DanceTypeService(DanceTypeRepository danceTypeRepository) {
        this.danceTypeRepository = danceTypeRepository;
    }

    public List<DanceType> findAll() {
        return danceTypeRepository.findAllByOrderByNameAsc();
    }

    public DanceType findDanceTypeByName(String name) {
        return danceTypeRepository.findDanceTypeByName(name);
    }
}

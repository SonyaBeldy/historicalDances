package ru.sonyabeldy.historicaldances.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sonyabeldy.historicaldances.models.DanceType;
import ru.sonyabeldy.historicaldances.repositories.DanceTypeRepository;

import java.util.List;
import java.util.Optional;

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

    public Optional<DanceType> findDanceTypeByName(String name) {
        return danceTypeRepository.findDanceTypeByName(name);
    }

    public void save(DanceType danceType) {
        danceTypeRepository.save(danceType);
    }
}

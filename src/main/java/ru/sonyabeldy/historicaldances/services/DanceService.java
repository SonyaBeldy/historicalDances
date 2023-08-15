package ru.sonyabeldy.historicaldances.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sonyabeldy.historicaldances.models.Dance;
import ru.sonyabeldy.historicaldances.models.DanceType;
import ru.sonyabeldy.historicaldances.repositories.DanceRepository;

import java.util.List;

@Service
public class DanceService {

    private final DanceRepository danceRepository;

    @Autowired
    public DanceService(DanceRepository danceRepository) {
        this.danceRepository = danceRepository;
    }

    public List<Dance> findAllByDanceTypeId(DanceType danceType) {
        return danceRepository.findAllByOwner(danceType);
    }
}

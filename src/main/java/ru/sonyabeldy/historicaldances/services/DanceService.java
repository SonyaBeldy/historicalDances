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
        return danceRepository.findAllByType(danceType);
    }

    public List<Dance> findAll() {
        return danceRepository.findAllByOrderByNameAsc();
    }

    public void save(Dance dance, DanceType danceType) {
        dance.setType(danceType);
        danceRepository.save(dance);
    }

    public void delete(Dance dance) {
        danceRepository.delete(dance);

    }
}

package ru.sonyabeldy.historicaldances.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.sonyabeldy.historicaldances.models.DanceList;
import ru.sonyabeldy.historicaldances.repositories.DanceListRepository;

import java.util.Date;
import java.util.List;

@Service
public class DanceListService {

    private final DanceListRepository danceListRepository;

    @Autowired
    public DanceListService(DanceListRepository danceListRepository) {
        this.danceListRepository = danceListRepository;
    }

    public List<DanceList> findAll() {
        return danceListRepository.findAll();
    }

    public void save(DanceList danceList) {
        danceList.setDate(new Date());
        danceListRepository.save(danceList);
    }
}

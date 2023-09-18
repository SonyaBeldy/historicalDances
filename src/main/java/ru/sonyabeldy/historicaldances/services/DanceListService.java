package ru.sonyabeldy.historicaldances.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.sonyabeldy.historicaldances.dto.DanceListDTO;
import ru.sonyabeldy.historicaldances.models.DanceList;
import ru.sonyabeldy.historicaldances.repositories.DanceListRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DanceListService {

    private final DanceListRepository danceListRepository;

    @Autowired
    public DanceListService(DanceListRepository danceListRepository) {
        this.danceListRepository = danceListRepository;
    }

    public List<DanceList> findAll() {
        return danceListRepository.findAllByOrderByIdAsc();
    }

    public void save(DanceList danceList) {
        danceList.setDate(new Date());
        danceListRepository.save(danceList);
    }

    public void update(int id, DanceList updatedDanceList) {
        updatedDanceList.setId(id);
        danceListRepository.save(updatedDanceList);
    }

    public Optional<DanceList> findById(int id) {
        return danceListRepository.findById(id);
    }
}

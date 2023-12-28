package ru.sonyabeldy.historicaldances.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.sonyabeldy.historicaldances.dto.DanceListDTO;
import ru.sonyabeldy.historicaldances.models.Dance;
import ru.sonyabeldy.historicaldances.models.DanceList;
import ru.sonyabeldy.historicaldances.repositories.DanceListRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class DanceListService {

    private final DanceListRepository danceListRepository;

    @Autowired
    public DanceListService(DanceListRepository danceListRepository) {
        this.danceListRepository = danceListRepository;
    }

    public List<DanceList> findAll() {
        return danceListRepository.findAllByOrderByIdAsc();
    }

    @Transactional
    public void save(DanceList danceList) {
        danceList.setDate(new Date());
        danceListRepository.save(danceList);
    }

    @Transactional
    public void update(DanceList updatedDanceList) {
        danceListRepository.save(updatedDanceList);
    }

    public DanceList findById(int id) {
        Optional<DanceList> foundList = danceListRepository.findById(id);
        return foundList.orElse(null);
    }

    @Transactional
    public void delete(DanceList danceList) {
        danceListRepository.delete(danceList);
    }

    @Transactional
    public void deleteDance(DanceList danceList, Dance dance) {
        danceList.getDances().remove(dance);
        danceListRepository.save(danceList);
    }
}

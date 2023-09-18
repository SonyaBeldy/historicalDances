package ru.sonyabeldy.historicaldances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sonyabeldy.historicaldances.models.DanceList;

import java.util.List;

@Repository
public interface DanceListRepository extends JpaRepository<DanceList, Integer> {

    List<DanceList> findAllByOrderByIdAsc();
}

package ru.sonyabeldy.historicaldances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sonyabeldy.historicaldances.models.DanceList;

@Repository
public interface DanceListRepository extends JpaRepository<DanceList, Integer> {
}

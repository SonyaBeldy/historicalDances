package ru.sonyabeldy.historicaldances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sonyabeldy.historicaldances.models.Dance;
import ru.sonyabeldy.historicaldances.models.DanceType;

import java.util.List;

@Repository
public interface DanceRepository extends JpaRepository<Dance, Integer> {

    List<Dance> findAllByType(DanceType type);

    List<Dance> findAllByOrderByNameAsc();
}

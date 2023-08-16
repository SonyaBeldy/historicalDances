package ru.sonyabeldy.historicaldances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sonyabeldy.historicaldances.models.DanceType;

import java.util.List;

@Repository
public interface DanceTypeRepository extends JpaRepository<DanceType, Integer> {

    List<DanceType> findAllByOrderByNameAsc();

    DanceType findDanceTypeByName(String id);
}
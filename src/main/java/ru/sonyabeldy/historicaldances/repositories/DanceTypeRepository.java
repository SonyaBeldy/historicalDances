package ru.sonyabeldy.historicaldances.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.sonyabeldy.historicaldances.models.DanceType;

@Repository
public interface DanceTypeRepository extends JpaRepository<DanceType, Integer> {

}

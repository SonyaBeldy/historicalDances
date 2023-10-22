package ru.sonyabeldy.historicaldances.dto;

import lombok.*;
import ru.sonyabeldy.historicaldances.models.Dance;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DanceListDTO {

    private int id;
    private String name;
    private Timestamp date;
    private String description;
    private DanceDTO[] dances;
}

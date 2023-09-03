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

    private String name;

    private String description;

    private Timestamp date;

//    private List<DanceDTO> dances;
}

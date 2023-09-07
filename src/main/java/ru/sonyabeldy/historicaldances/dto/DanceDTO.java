package ru.sonyabeldy.historicaldances.dto;

import jakarta.persistence.*;
import lombok.*;
import ru.sonyabeldy.historicaldances.models.DanceType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DanceDTO {


    private String name;

    private DanceTypeDTO type;

    private String videoLink;

    private String description;

    private int difficult;
}

package ru.sonyabeldy.historicaldances.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DanceDTO {

    private int id;

    private String name;

    private DanceTypeDTO type;

    private String videoLink;

    private String description;

    private int difficulty;
}

package ru.sonyabeldy.historicaldances.dto;

import jakarta.persistence.*;
import lombok.*;
import ru.sonyabeldy.historicaldances.models.DanceType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DanceDTO {


    private String name;

    private DanceType owner;

    private String videoLink;

    private String description;

    private int difficult;
}

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

    @Column(name = "video_link")
    private String videoLink;

    @Column(name = "description")
    private String description;

    @Column(name = "difficulty")
    private int difficult;
}

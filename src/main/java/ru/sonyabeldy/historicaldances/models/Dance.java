package ru.sonyabeldy.historicaldances.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "dance")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Dance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "dance_type_id", referencedColumnName = "id")
    private DanceType type; //переименовать в type

    @Column(name = "video_link")
    private String videoLink;

    @Column(name = "description")
    private String description;

    @Column(name = "difficulty")
    private int difficult;

    @ManyToMany
    @JoinTable(
            name = "dance_from_dance_list",
            joinColumns = @JoinColumn(name = "dance_id"),
            inverseJoinColumns = @JoinColumn(name = "list_id")
    )
    private Set<DanceList> danceLists;

}

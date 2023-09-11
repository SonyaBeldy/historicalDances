package ru.sonyabeldy.historicaldances.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.sonyabeldy.historicaldances.services.DanceService;
import ru.sonyabeldy.historicaldances.services.DanceTypeService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/dances")
public class DanceController {

    private final DanceService danceService;
    private final DanceTypeService danceTypeService;

    @Autowired
    public DanceController(DanceService danceService, DanceTypeService typeService) {
        this.danceService = danceService;
        this.danceTypeService = typeService;
    }

    @GetMapping("/{danceType}")
    public String show(@PathVariable("danceType") String danceType, Model model) {
        int[] arr = {1, 3 , 5};
        HashSet<Integer> hs = Arrays.stream(arr).boxed().collect(Collectors.toCollection(HashSet::new));

        ArrayList<Integer> list = new ArrayList<>();
        model.addAttribute("danceType", danceType);
        model.addAttribute("dances",
                danceService.findAllByDanceTypeId(danceTypeService.findDanceTypeByName(danceType).orElseThrow()));
        System.out.println(danceService.findAllByDanceTypeId(danceTypeService.findDanceTypeByName(danceType).orElseThrow()).get(0).getId());
        return "dances/show";
    }

    @GetMapping()
    public String showDanceList(Model model) {
        model.addAttribute("dances",
                danceService.findAll());
        return "dances/dance-list";
    }

}

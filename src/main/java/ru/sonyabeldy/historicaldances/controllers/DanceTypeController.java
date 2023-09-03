package ru.sonyabeldy.historicaldances.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.sonyabeldy.historicaldances.services.DanceTypeService;

@Controller
@RequestMapping("/dance-types")
public class DanceTypeController {

    private final DanceTypeService danceTypeService;

    public DanceTypeController(DanceTypeService danceTypeService) {
        this.danceTypeService = danceTypeService;
    }

    @GetMapping()
    public String index(Model model) {
        model.addAttribute("danceTypes", danceTypeService.findAll());
        return "dances/index";
    }

}

package ru.sonyabeldy.historicaldances.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class MainPageController {

    @GetMapping()
    public String index(Model model) {
        return "main";
    }

}

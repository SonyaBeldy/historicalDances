package ru.sonyabeldy.historicaldances.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dance-list")
public class DanceListController {



    @GetMapping()
    public String getAll() {
        return "";
    }
}

package ru.sonyabeldy.historicaldances.controllers;

import org.hibernate.validator.constraints.CodePointLength;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminPageController {

    @GetMapping()
    public String index() {
        System.out.println("haha");
        return "admin/index";
    }

}

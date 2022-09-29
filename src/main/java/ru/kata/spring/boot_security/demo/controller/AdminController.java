package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    public UserService userService;

    public RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {

        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String showAllUsers(Principal principal, Model model) {
        model.addAttribute("userAuth", userService.findUserByEmail(principal.getName()));
        model.addAttribute("users", userService.showAllUsers());
        model.addAttribute("roles", roleService.findAllRoles());
        model.addAttribute("user", new User());
        return "admin";
    }

    @PostMapping("/add")
    public String createUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/edit/{id}")
    public String updateUser(@ModelAttribute("users") User user) {
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") long id) {
        userService.deleteUserById(id);
        return "redirect:/admin";
    }
}

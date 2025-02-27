package com.johnsoncskoo.gymfinder.gym.repository;

import com.johnsoncskoo.gymfinder.gym.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Integer> {
    List<Equipment> findAllByGymId(String id);
}

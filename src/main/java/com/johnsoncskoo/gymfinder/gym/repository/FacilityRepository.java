package com.johnsoncskoo.gymfinder.gym.repository;

import com.johnsoncskoo.gymfinder.gym.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Integer> {
    List<Facility> findAllByGymId(String gymId);
}

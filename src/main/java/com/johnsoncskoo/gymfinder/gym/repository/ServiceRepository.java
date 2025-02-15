package com.johnsoncskoo.gymfinder.gym.repository;

import com.johnsoncskoo.gymfinder.gym.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
    List<Service> findAllByGymId(String gymId);
}

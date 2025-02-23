package com.johnsoncskoo.gymfinder.address.repository;

import com.johnsoncskoo.gymfinder.address.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
}

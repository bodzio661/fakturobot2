package com.chemia.fakturobot2.repository;

import com.chemia.fakturobot2.domain.Kontrachent;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Kontrachent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KontrachentRepository extends JpaRepository<Kontrachent, Long> {
}

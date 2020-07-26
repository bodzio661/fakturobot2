package com.chemia.fakturobot2.repository.search;

import com.chemia.fakturobot2.domain.Kontrachent;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Kontrachent} entity.
 */
public interface KontrachentSearchRepository extends ElasticsearchRepository<Kontrachent, Long> {
}

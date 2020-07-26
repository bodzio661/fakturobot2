package com.chemia.fakturobot2.repository.search;

import com.chemia.fakturobot2.domain.Faktura;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Faktura} entity.
 */
public interface FakturaSearchRepository extends ElasticsearchRepository<Faktura, Long> {
}

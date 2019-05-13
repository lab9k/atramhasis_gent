# -*- coding: utf-8 -*-

import logging
from skosprovider_sqlalchemy.providers import SQLAlchemyProvider
from atramhasis_gent.uri.generators import UriPatternGenerator

log = logging.getLogger(__name__)


def includeme(config):
    atram_gent = SQLAlchemyProvider(
        {
            'id': 'gent_words',
            'conceptscheme_id': 1,
        },
        config.registry.dbmaker,
        uri_generator=UriPatternGenerator(
            'https://stad.gent/id/concepts/gent_words/%s'
        )
    )
    themes_gent = SQLAlchemyProvider(
        {
            'id': 'gent_themes',
            'conceptscheme_id': 2,
        },
        config.registry.dbmaker,
        uri_generator=UriPatternGenerator(
            'https://stad.gent/id/concepts/gent_themes/%s'
        )
    )
    info_types = SQLAlchemyProvider(
        {
            'id': 'gent_info_types',
            'conceptscheme_id': 3,
        },
        config.registry.dbmaker,
        uri_generator=UriPatternGenerator(
            'https://stad.gent/id/concepts/gent_info_types/%s'
        )
    )

    skosregis = config.get_skos_registry()
    skosregis.register_provider(atram_gent)
    skosregis.register_provider(themes_gent)
    skosregis.register_provider(info_types)

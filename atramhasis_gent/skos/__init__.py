# -*- coding: utf-8 -*-

import logging
from skosprovider_sqlalchemy.providers import SQLAlchemyProvider

log = logging.getLogger(__name__)


def includeme(config):
    atram_gent = SQLAlchemyProvider(
        {
            'id': 'gent_words',
            'conceptscheme_id': 1,
        },
        config.registry.dbmaker
    )
    THEMES_GENT = SQLAlchemyProvider(
        {
           'id': 'gent_themes',
           'conceptscheme_id': 2,
        },
        config.registry.dbmaker
    )
    INFO_TYPES = SQLAlchemyProvider(
        {
           'id': 'gent_themes',
           'conceptscheme_id': 3,
        },
        config.registry.dbmaker
    )

    skosregis = config.get_skos_registry()
    skosregis.register_provider(atram_gent)
    skosregis.register_provider(THEMES_GENT)
    skosregis.register_provider(INFO_TYPES)

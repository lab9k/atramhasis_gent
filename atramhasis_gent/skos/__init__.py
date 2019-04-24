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

    skosregis = config.get_skos_registry()
    skosregis.register_provider(atram_gent)

# -*- coding: utf-8 -*-

import logging
from skosprovider_sqlalchemy.providers import SQLAlchemyProvider
from skosprovider_getty.providers import AATProvider
from skosprovider.providers import VocabularyProvider
from atramhasis_gent.uri.generators import UriPatternGenerator

log = logging.getLogger(__name__)


def includeme(config):
    skosregis = config.get_skos_registry()

    gentproviders = get_internal_providers(config)

    [skosregis.register_provider(x) for x in gentproviders]

    gentproviders = get_external_providers()

    [skosregis.register_provider(x) for x in gentproviders]


def get_internal_providers(config):
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
    return [atram_gent, themes_gent, info_types, ]


def get_external_providers():
    # aat = AATProvider({'id': 'AAT', 'subject': ['external']})
    return []

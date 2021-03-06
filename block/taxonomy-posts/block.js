'use strict';

import { edit } from './_edit.js';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { withSelect } = wp.data;

registerBlockType( 'snow-monkey-blocks/taxonomy-posts', {
	title: __( 'Taxonomy posts', 'snow-monkey-blocks' ),
	description: __( 'You can display recent posts linked to any taxonomy.', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#cd162c',
		src: 'editor-ul',
	},
	category: 'smb',

	edit: withSelect( ( select ) => {
		const { getTaxonomies, getEntityRecords } = select( 'core' );

		const AllTaxonomies = getTaxonomies( { per_page: -1 } ) || [];
		const taxonomies = AllTaxonomies.filter( ( taxonomy ) => taxonomy.visibility.show_ui );

		const taxonomiesTerms = {};
		for ( const taxonomy of taxonomies ) {
			const terms = getEntityRecords( 'taxonomy', taxonomy.slug, { per_page: -1 } ) || [];
			if ( 0 < terms.length ) {
				taxonomiesTerms[ taxonomy.slug ] = terms;
			}
		}

		return {
			withSelect: {
				taxonomies: taxonomies,
				taxonomiesTerms: taxonomiesTerms,
			},
		};
	} )( edit ),

	save() {
		return null;
	},
} );

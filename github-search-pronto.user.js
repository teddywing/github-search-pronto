// ==UserScript==
// @name GitHub Search Pronto
// @description Search immediately inside a repository without having to wait for the drop-down
// @namespace com.teddywing
// @match https://github.com/*
// ==/UserScript==

// Copyright (c) 2018  Teddy Wing
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.


var search_field = document.querySelector('.js-site-search-field');

if (!search_field) {
	return;
}

search_field.addEventListener('keydown', function(e) {
	var search_drop_down = document.querySelector('.js-jump-to-suggestions-results-container');
	var loading_spinner = search_drop_down.querySelector('[alt="Octocat Spinner Icon"]');

	if (e.key === 'Enter' &&
		(
			!is_visible(search_drop_down) ||
			(
				is_visible(search_drop_down) &&
				is_visible(loading_spinner)
			)
		)
	) {
		var query = search_field.value;

		// Get "https://github.com/owner/repo"
		var repo_url = window.location.href.split('/').slice(0, 5).join('/');

		window.location.assign(
			repo_url +
			'/search?q=' +
			query +
			'&amp;unscoped_q=' +
			query
		);
	}
});


function is_visible(node) {
	return node && node.offsetParent !== null;
}

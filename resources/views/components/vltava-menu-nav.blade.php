@props([
'categories',
'activeCategory'
])
<nav class="sidebar">
    <div id="sidebar-tabs" class="sidebar__tabs">
        <button data-tab="menu" class="sidebar__tab sidebar__tab--active" >Меню</button>
        <button data-tab="bar" class="sidebar__tab">Бар</button>
    </div>

    <span class="sidebar__pointer sidebar__pointer--up"></span>

    <ul class="sidebar__list sidebar__list--active" id="menu">
        @foreach($categories['Menu'] as $category)
            <x-vltava-button class="sidebar__item">
                {{$category->name}}
            </x-vltava-button>
        @endforeach
    </ul>

    <ul class="sidebar__list" id="bar">
        @foreach($categories['Bar'] as $category)
            <x-vltava-button class="sidebar__item">
                {{$category->name}}
            </x-vltava-button>
        @endforeach
    </ul>

    <span class="sidebar__pointer sidebar__pointer--down"></span>
</nav>
@push('styles')
    @vite('resources/sass/components/vltava-menu-nav.scss')
@endpush
@push('scripts')
    <script src="https://unpkg.com/htmx.org@2.0.4"
            integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+"
            crossorigin="anonymous"></script>
    @vite('resources/js/components/vltava-menu-nav.js')
@endpush

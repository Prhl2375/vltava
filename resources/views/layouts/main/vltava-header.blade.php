<header class="vltava-header">
    <div class="vltava-header-container">
        <div class="vltava-header__logo">
            <a href="{{route('home')}}">
                <img src="{{asset('images/logo.png')}}" alt="logo">
            </a>
        </div>
        <div class="vltava-header__right">
            <x-vltava-button>
                Аккаунт
            </x-vltava-button>
            <x-vltava-button link="{{route('menu')}}">
                Меню
            </x-vltava-button>
            <div class="vltava-header__dropdown">
                UA▼
            </div>
        </div>
    </div>
    @yield('header-title')
</header>

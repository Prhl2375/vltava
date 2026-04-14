@extends('layouts.menu-layout')
@section('title')
    Vltava menu
@endsection
@section('header-title')
    <x-vltava-separator>
        <h3>Алкогольні коктелі</h3>
    </x-vltava-separator>
@endsection
@section('content')
    <div class="container">
        <!-- sidebar.html -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">


        <div class="menu">
            <div class="menu-left">
                <x-vltava-menu-nav
                    :categories="$categories"
                    :defaultCategory="$activeCategory">
                </x-vltava-menu-nav>
            </div>
            <div class="menu-right">
            </div>
        </div>
    </div>
@endsection
@push('styles')
    @vite('resources/sass/pages/menu.scss')
@endpush
@push('scripts')
    <script src="https://unpkg.com/htmx.org@2.0.4" integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+" crossorigin="anonymous"></script>
@endpush

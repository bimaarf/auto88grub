<?php

namespace App\Filament\Resources\Main\PromoResource\Pages;

use App\Filament\Resources\Main\PromoResource;
use Filament\Resources\Pages\ManageRecords;
use Filament\Resources\Pages\ListRecords;

class ManagePromos extends ManageRecords
{
    protected static string $resource = PromoResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }

    public function getTabs(): array
    {
        return [
            // is_pinned | is_visible | is_done
            null => ListRecords\Tab::make('All'),
            'upcoming' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('is_done', false)->where('is_pinned', true)->where('is_visible', true)),
            'existing' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('is_done', true)->where('is_pinned', true)->where('is_visible', true)),
            'visible' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('is_visible', true)->where('is_pinned', false)->where('is_done', false)),
            'hide' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('is_visible', false)->where('is_pinned', false)->where('is_done', false)),
            // 'pinned & visible' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('is_pinned', true)->where('is_visible', true)),
            // 'pinned & unvisible' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('is_pinned', true)->where('is_visible', false)),
            // 'unpinned & visible' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('is_pinned', false)->where('is_visible', true)),
            // 'unpinned & unvisible' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('is_pinned', false)->where('is_visible', false)),
        ];
    }
}

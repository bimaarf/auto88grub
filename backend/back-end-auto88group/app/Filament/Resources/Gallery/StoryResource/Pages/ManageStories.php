<?php

namespace App\Filament\Resources\Gallery\StoryResource\Pages;

use App\Filament\Resources\Gallery\StoryResource;
use App\Models\Gallery\Story;
use Filament\Resources\Pages\ManageRecords;

class ManageStories extends ManageRecords
{
    protected static string $resource = StoryResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()
                ->mutateFormDataUsing(
                    function (array $data): array {
                        $total = Story::count();

                        $data['order_column'] = $total++;

                        return $data;
                    },
                )->createAnother(false),
        ];
    }

    public function getTabs(): array
    {
        return [
            // null => \Filament\Resources\Components\Tab::make('All'),
            'education' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Education')->orderBy('order_column')),
            'quote' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Quote')->orderBy('order_column')),
            'cover' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Cover')->orderBy('order_column')),
            'calendar' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Calendar')->orderBy('order_column')),
            'advantage' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Advantage')->orderBy('order_column')),
            'photoshoot' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Photoshoot')->orderBy('order_column')),
            'poem' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Poem')->orderBy('order_column')),
        ];
    }
}

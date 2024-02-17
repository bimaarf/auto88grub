<?php

namespace App\Filament\Resources\Gallery\FeedResource\Pages;

use App\Filament\Resources\Gallery\FeedResource;
use App\Models\Gallery\Feed;
use Filament\Resources\Pages\ManageRecords;

class ManageFeeds extends ManageRecords
{
    protected static string $resource = FeedResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()
                ->mutateFormDataUsing(
                    function (array $data): array {
                        $total = Feed::count();

                        $data['order_column'] = $total++;

                        return $data;
                    },
                )->createAnother(false),
        ];
    }

    public function getTabs(): array
    {
        return [
            'advantage' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Advantage')->orderBy('order_column')),
            'recruitment' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Recruitment')->orderBy('order_column')),
            'cover (3:4)' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'Cover')->orderBy('order_column')),
        ];
    }
}

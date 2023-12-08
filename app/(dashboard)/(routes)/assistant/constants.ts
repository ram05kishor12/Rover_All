import * as z from 'zod';

export const formSchema = z.object({
    prompt: z.string().min(1 ,{
        message: ' Prompt is required',
    }),
    voice: z.string().min(1),
});

export const voice = [
    {
        value: 'alloy',
        label: 'Alloy',
    },
    {
        value: 'echo',
        label: 'Echo',
    },
    {
        value: 'fable',
        label: 'Fable',
    },
    {
        value: 'nova',
        label: 'Nova',
    },
    {
        value: 'onyx',
        label: 'Onyx',
    },
    {
        value: 'shimmer',
        label: 'Shimmer',
    },
    {
        value: 'vanguard',
        label: 'Vanguard',
    },
];



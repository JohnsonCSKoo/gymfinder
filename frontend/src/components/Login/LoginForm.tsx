import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {useNavigate} from "react-router-dom";
import {LoginDto} from "@/@types/auth";
import {AppDispatch, RootState} from "@/state/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "@/state/authSlice.ts";

const formSchema = z.object({
    email: z.string()
        .email({
            message: "Please enter a valid email address.",
        }),

    password: z.string()
        .min(8, {
            message: "Please enter a valid password."
        })
});

const LoginForm: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    // form definition
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // form handler
    const onSubmit = (values: z.infer<typeof formSchema>) => {

        const loginDto: LoginDto = {
            email: values.email,
            password: values.password,
        }

        dispatch(loginUser(loginDto)).then(() => {
            navigate("/");
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john_doe@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" {...field} type={"password"} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                        {error &&
                            <FormDescription className="text-red-500">{error}</FormDescription>
                        }
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};

export default LoginForm;

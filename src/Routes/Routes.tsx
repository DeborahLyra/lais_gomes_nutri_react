import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { PrivateRoute } from "../components/general/PrivateRoute";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { AllNewsPage } from "../pages/dashboard/AllNewsPage";
import { NewsDetail } from "../pages/dashboard/NewsDetail";
import { AllRecipesPage } from "../pages/dashboard/AllRecipesPage";
import { RecipeDetail } from "../pages/dashboard/RecipeDetail";


export function RouterComponent() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route
                    path="admin"
                    element={
                        <PrivateRoute>
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />

                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<HomePage />} />
                </Route>
                
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/all-news-page" element={<AllNewsPage />} />
                <Route path="/news-detail" element={<NewsDetail />} />
                <Route path="/all-recipes-page" element={<AllRecipesPage/>} />
                <Route path="/recipe-detail" element={<RecipeDetail/>} />
                <Route path="/admim-dashboard" element={<AdminDashboard/>} />

            </Routes>
        </BrowserRouter>
    )
}
